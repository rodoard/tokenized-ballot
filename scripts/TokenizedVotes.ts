import { viem } from "hardhat";
import { formatEther, parseEther } from "viem";

const MINT_VALUE = parseEther("10");

async function main() {
    const publicClient = await viem.getPublicClient();
    async function waitsForTransaction(fn: any) {
        const hash = await fn()
        await publicClient.waitForTransactionReceipt({ hash })
    }
    const [deployer, acc1, acc2] = await viem.getWalletClients();
    const contract = await viem.deployContract("TokenizedVote");
    console.log(`Token contract deployed at ${contract.address}\n`);
    await waitsForTransaction(
        async () => await contract.write.mint([acc1.account.address, MINT_VALUE])
    )
    console.log(
        `Minted ${MINT_VALUE.toString()} decimal units to account ${acc1.account.address
        }\n`
    );
    const balanceBN = await contract.read.balanceOf([acc1.account.address]);
    console.log(
        `Account ${acc1.account.address
        } has ${balanceBN.toString()} or ${formatEther(balanceBN)} decimal units of TokenizedToken\n`
    );

    const votes = await contract.read.getVotes([acc1.account.address]);
    console.log(
        `Account ${acc1.account.address
        } has ${votes.toString()} units of voting power before self delegating\n`
    );

    await waitsForTransaction(
        async () => await contract.write.delegate([acc1.account.address], {
            account: acc1.account,
        })
    )
    const votesAfter = await contract.read.getVotes([acc1.account.address]);
    console.log(
        `Account ${acc1.account.address
        } has ${votesAfter.toString()} units of voting power after self delegating\n`
    );
    
    await waitsForTransaction(
        async () => await contract.write.transfer(
            [acc2.account.address, MINT_VALUE / 2n],
            {
                account: acc1.account,
            })
    )

    const acc1Votes = await contract.read.getVotes([acc1.account.address]);
    console.log(
        `Account ${acc1.account.address
        } has ${acc1Votes.toString()} units of voting power after transfer\n`
    );

    const acc2Votes = await contract.read.getVotes([acc2.account.address]);
    console.log(
        `Account ${acc2.account.address
        } has ${acc2Votes.toString()} units of voting power after transferg\n`
    );

    await waitsForTransaction(
        async () => await contract.write.delegate(
            [acc2.account.address],
            {
                account: acc2.account,
            })
    )

    const acc2VotesAfter = await contract.read.getVotes([acc2.account.address]);
    console.log(
        `Account ${acc2.account.address
        } has ${acc2VotesAfter.toString()} units of voting power after self delegating\n`
    );
 console.log("********************************************")
    const lastBlockNumber = await publicClient.getBlockNumber();
    for (let index = lastBlockNumber - 1n; index > 0n; index--) {
      const pastVotes = await contract.read.getPastVotes([
        acc1.account.address,
        index,
      ]);
      console.log(
        `Account ${
          acc1.account.address
        } had ${pastVotes.toString()} units of voting power at block ${index}\n`
      );
    }
}  

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });