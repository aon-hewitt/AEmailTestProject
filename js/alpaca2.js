
var platform;
var repository;
var branch;
var username;
var password;
var config;
var workflowId = 'amexWorkflowShort';
var emailProviderId = '6b1b6a8e002d85bb28bd';



//var applicationId = '8bd86d95d89e2980b664'; 
//var projectId = 'f2c138afb9b12ffec417'; 
//var repositoryId = 'd3760b30a4b894876003'; 
//var branchId = '71c33d4740fe00932be3'; 

 //original good
var applicationId = '6d5aa7e34b8be727b8d5'; 
var projectId = '06fea8ff21b87b9e8358';  
var repositoryId = 'f2c3571d7a2955e7f8a1'; 
var branchId = '7935c19b649b9c399528';  


username = 'johnvogen';
password = 'Sammy51856_';

//config = {
//               "username": username,
//             "password": password,
//              "baseURL": "/proxy"
// }


config = {
    "clientKey": "1bd1ddc4-37c7-4c80-b69b-b0d8d226cc34",
    "clientSecret": "CamxJ6k/aNYbuZVV1uTox0imFpsURRugGjt/AD77DGENmJ+U87Z1eh4KBdKtCcY8/Regd9DH8DYWGJ2mcdSCsK3a+aX1WR2ftnxQQ8yg6ck=",
    "username": username,
    "password": password,
    "baseURL": "https://api.cloudcms.com",
    "application": "c8a4dc1dd5644f2934be"
}

Gitana.connect(config, function (err) {

}).then(function () {
    platform = this;
    this.readRepository(repositoryId).then(function () {
        repository = this;
        this.readBranch(branchId).then(function () {
            branch = this;
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
    //workflowConfig.runtime.repositoryId = repositoryId;
    //workflowConfig.runtime.branchId = branchId;

    console.log("workflowconfig: ", workflowConfig);
    // auth info
    var authInfo = platform.getDriver().authInfo;

    platform.readDomain(authInfo.principalDomainId).readPrincipal(authInfo.principalId).then(function () {
        var currentUser = this;

        console.log("currentUser: ", currentUser);
        // create workflow and include the current user's email

        console.log("platform: ", platform);
        console.log("workflowId: ", workflowId);
        this.subchain(platform).createWorkflow(workflowId, workflowConfig).then(function () {
            var data = {
                "coreNodeId": '',
                "draftNodeId": '',
                "email": currentUser.email
            }
            this.start(data).then(function () {
            });
        });
    });

}

