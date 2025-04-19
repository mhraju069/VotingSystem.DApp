const hre = require("hardhat")
async function main() {
    const voting = await hre.ethers.getContractFactory("Voting")
    console.log('Deploying...')
    const vote = await voting.deploy()
    await vote.waitForDeployment()
    console.log('Deploying success to : ', vote.target)

}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })