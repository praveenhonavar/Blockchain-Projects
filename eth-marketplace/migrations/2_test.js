var Demo = artifacts.require("./test.sol");

module.exports = function (deployer) {
    deployer.deploy(Demo);
}