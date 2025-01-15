const mintCarbonOffsetBtn = document.getElementById('mint-carbon-offset-btn');
const redeemCarbonOffsetBtn = document.getElementById('redeem-carbon-offset-btn');
const responseDiv = document.getElementById('response');

const client = new StacksClient({
    network: StacksNetwork.Mainnet
