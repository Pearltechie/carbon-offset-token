const { assertEquals, assertRejects } = require('@stacks/clarinet');
const { chain } = require('@stacks/clarinet');

describe('Carbon Offset Token', () => {

    it('should offset carbon for a user', async () => {
        const block = await chain.mineBlock([
            chain.callContract('carbon-offset-token.offset-carbon', [100]),
        ]);
        assertEquals(block.receipts[0].result, '(ok "Carbon offset successfully recorded!")');
    });

    it('should check carbon offset for a user', async () => {
        // First, offset some carbon
        await chain.mineBlock([
            chain.callContract('carbon-offset-token.offset-carbon', [100]),
        ]);

        const block = await chain.mineBlock([
            chain.callContract('carbon-offset-token.get-offsets', ['SP2Q5YXZ8JKC0F7N6Z9S0D5XRTW57S1C9E']),
        ]);
        assertEquals(block.receipts[0].result, '(ok "Carbon offsets: 100")');
    });

    it('should reject checking offsets for a user with no record', async () => {
        const block = await chain.mineBlock([
            chain.callContract('carbon-offset-token.get-offsets', ['SP2Q5YXZ8JKC0F7N6Z9S0D5XRTW57S1C9E']),
        ]);
        assertEquals(block.receipts[0].result, '(err "No offsets recorded for this user")');
    });
});
