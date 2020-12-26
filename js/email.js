var workflowId = 'amexWorkflowShort';
var emailProviderId = '6b1b6a8e002d85bb28bd';  //platform provider
//var emailProviderId = '5ab62bd0c77fa211e0d1';  //Test provider


username = 'johnvogen';
password = 'Sammy51856_';

//original good project - 'American Express' values
var applicationId = '6d5aa7e34b8be727b8d5';
//var projectId = '06fea8ff21b87b9e8358';
//var repositoryId = 'f2c3571d7a2955e7f8a1';
//var branchId = '7935c19b649b9c399528';

//alternate bad project - 'AEmailTest' values:
//var applicationId = '8bd86d95d89e2980b664';
var projectId = 'f2c138afb9b12ffec417';
var repositoryId = 'd3760b30a4b894876003';
var branchId = '71c33d4740fe00932be3';

config = {
    "username": username,
    "password": password,
    "baseURL": "/proxy"
}

//config = {
//    "clientKey": " 9bfbfd0f-49e2-4909-9d10-37a32b88af8f",
//    "clientSecret": "j2hIV3Da5L3moRzo0ykv2xbFIAK/02c5g08nDVoWAkXKQpU/aRK3sStjVd0nEAX7YGmjwoijPZ5/x14qNSnx1amvLgeVSWany6Avpnlyf9Q=",
//    "username": username,
//    "password": password,
//    "baseURL": "https://api.cloudcms.com",
//    "application": "8bd86d95d89e2980b664"
//}



Gitana.connect(config, function (err) {
}).then(function () {
    platform = this;
    this.readRepository(repositoryId).then(function () {
        repository = this;
        this.readBranch(branchId).then(function () {
            branch = this;
            sendEmail();
        });
    });
});

function sendEmail() {
    var workflowConfig = {};
    workflowConfig.context = {};
    workflowConfig.context.projectId = projectId;
    workflowConfig.payloadType = "content";
    workflowConfig.payloadData = {
        "repositoryId": repositoryId,
        "branchId": branchId
    };
    workflowConfig.runtime = {};
    workflowConfig.runtime.applicationId = applicationId;
    workflowConfig.runtime.emailProviderId = emailProviderId;
    var authInfo = platform.getDriver().authInfo;
    platform.readDomain(authInfo.principalDomainId).readPrincipal(authInfo.principalId).then(function () {
        var currentUser = this;
        this.subchain(platform).createWorkflow(workflowId, workflowConfig).then(function () {
            var data = {
                "email": currentUser.email
            }
            this.start(data).then(function () {
            });
        });
    });
}