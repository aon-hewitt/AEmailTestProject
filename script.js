var applicationId = '8bd86d95d89e2980b664';
var emailProviderId = '6b1b6a8e002d85bb28bd'; //?
var workflowId = 'AEmailTestWorkflow';
var projectId = 'f2c138afb9b12ffec417';
var repositoryId = 'd3760b30a4b894876003';
var branchId = '71c33d4740fe00932be3';
var nodeId = '9e0b176c28ab5f16b2c0 ';

config = {
    "username": 'johnvogen',
    "password": 'Sammy51856_',
    "baseURL": "/proxy"

}
platform = Gitana.connect(config).then(function () {
    platform = this;
    repository = platform.readRepository(repositoryId).then(function () {
        branch = repository.readBranch(branchId).then(function () {
            node = branch.readNode(nodeId).then(function () {
                
            });
        });
    });
});





function sendEmail() {
    node.subchain(platform).then(function () {
        // NOTE: this = platform
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
        workflowConfig.runtime.repositoryId = repositoryId;
        workflowConfig.runtime.branchId = branchId;

        var authInfo = platform.getDriver().authInfo;

        this.readDomain(authInfo.principalDomainId).readPrincipal(authInfo.principalId).then(function () {
            var currentUser = this;


            this.subchain(platform).createWorkflow(workflowId, workflowConfig).then(function () {
                this.addResource(node);
                var data = {
                    "coreNodeId": node._doc,
                    "email": currentUser.email
                }
                this.start(data).then(function () {
                });
            });
        });
    });
}
