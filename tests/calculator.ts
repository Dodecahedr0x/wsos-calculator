import * as anchor from "@project-serum/anchor";

import { Calculator } from "../target/types/calculator";
import { Program } from "@project-serum/anchor";
import { expect } from "chai";

const { SystemProgram } = anchor.web3;

describe("calculator", () => {
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Calculator as Program<Calculator>;
  const programProvider = program.provider as anchor.AnchorProvider;

  it("Creating a constant", async () => {
    const computationKeypair = anchor.web3.Keypair.generate();
    const value = new anchor.BN(10);

    await program.methods
      .constant(value)
      .accounts({
        result: computationKeypair.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([computationKeypair])
      .rpc();

    const account = await program.account.computation.fetch(
      computationKeypair.publicKey
    );
    expect(account.value.toString()).to.eql(value.toString());
  });

  //Another test step - test out addition
  it("Addition", async () => {
    const lhsKeypair = anchor.web3.Keypair.generate();
    const rhsKeypair = anchor.web3.Keypair.generate();
    const resultKeypair = anchor.web3.Keypair.generate();
    const lhsValue = new anchor.BN(10);
    const rhsValue = new anchor.BN(10);
    const value = lhsValue.add(rhsValue);

    // Init terms
    await program.methods
      .constant(lhsValue)
      .accounts({
        result: lhsKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([lhsKeypair])
      .rpc({ skipPreflight: true, commitment: "finalized" });
    await program.methods
      .constant(rhsValue)
      .accounts({
        result: rhsKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([rhsKeypair])
      .rpc({ skipPreflight: true, commitment: "finalized" });

    // Addition
    await program.methods
      .add()
      .accounts({
        lhs: lhsKeypair.publicKey,
        rhs: rhsKeypair.publicKey,
        result: resultKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([resultKeypair])
      .rpc({ skipPreflight: true });

    const account = await program.account.computation.fetch(
      resultKeypair.publicKey
    );
    expect(account.value.toString()).to.eql(value.toString());
  });
});
