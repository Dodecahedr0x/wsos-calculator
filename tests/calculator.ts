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
      .rpc({ skipPreflight: true });
    await program.methods
      .constant(rhsValue)
      .accounts({
        result: rhsKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([rhsKeypair])
      .rpc({ skipPreflight: true });

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

  it("Multiplication", async () => {
    const lhsKeypair = anchor.web3.Keypair.generate();
    const rhsKeypair = anchor.web3.Keypair.generate();
    const resultKeypair = anchor.web3.Keypair.generate();
    const lhsValue = new anchor.BN(10);
    const rhsValue = new anchor.BN(10);
    const value = lhsValue.mul(rhsValue);

    // Init terms
    await program.methods
      .constant(lhsValue)
      .accounts({
        result: lhsKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([lhsKeypair])
      .rpc({ skipPreflight: true });
    await program.methods
      .constant(rhsValue)
      .accounts({
        result: rhsKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([rhsKeypair])
      .rpc({ skipPreflight: true });

    // Addition
    await program.methods
      .multiply()
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

  it("Divide", async () => {
    const lhsKeypair = anchor.web3.Keypair.generate();
    const rhsKeypair = anchor.web3.Keypair.generate();
    const resultKeypair = anchor.web3.Keypair.generate();
    const lhsValue = new anchor.BN(10);
    const rhsValue = new anchor.BN(10);
    const value = lhsValue.div(rhsValue);

    // Init terms
    await program.methods
      .constant(lhsValue)
      .accounts({
        result: lhsKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([lhsKeypair])
      .rpc({ skipPreflight: true });
    await program.methods
      .constant(rhsValue)
      .accounts({
        result: rhsKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([rhsKeypair])
      .rpc({ skipPreflight: true });

    // Divide
    await program.methods
      .divide()
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

  it("Modulo", async () => {
    const lhsKeypair = anchor.web3.Keypair.generate();
    const rhsKeypair = anchor.web3.Keypair.generate();
    const resultKeypair = anchor.web3.Keypair.generate();
    const lhsValue = new anchor.BN(10);
    const rhsValue = new anchor.BN(10);
    const value = lhsValue.mod(rhsValue);

    // Init terms
    await program.methods
      .constant(lhsValue)
      .accounts({
        result: lhsKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([lhsKeypair])
      .rpc({ skipPreflight: true });
    await program.methods
      .constant(rhsValue)
      .accounts({
        result: rhsKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([rhsKeypair])
      .rpc({ skipPreflight: true });

    // Modulo
    await program.methods
      .modulo()
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

  it("Compose operations", async () => {
    const lhsKeypair = anchor.web3.Keypair.generate();
    const rhsKeypair = anchor.web3.Keypair.generate();
    const r1Keypair = anchor.web3.Keypair.generate();
    const r2Keypair = anchor.web3.Keypair.generate();
    const r3Keypair = anchor.web3.Keypair.generate();
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
      .rpc({ skipPreflight: true });
    await program.methods
      .constant(rhsValue)
      .accounts({
        result: rhsKeypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([rhsKeypair])
      .rpc({ skipPreflight: true });

    await program.methods
      .add()
      .accounts({
        lhs: lhsKeypair.publicKey,
        rhs: rhsKeypair.publicKey,
        result: r1Keypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([r1Keypair])
      .rpc({ skipPreflight: true });

    let account = await program.account.computation.fetch(r1Keypair.publicKey);
    expect(account.value.toString()).to.eql("20");

    await program.methods
      .multiply()
      .accounts({
        lhs: lhsKeypair.publicKey,
        rhs: r1Keypair.publicKey,
        result: r2Keypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([r2Keypair])
      .rpc({ skipPreflight: true });

    account = await program.account.computation.fetch(r2Keypair.publicKey);
    expect(account.value.toString()).to.eql("200");

    await program.methods
      .divide()
      .accounts({
        lhs: r2Keypair.publicKey,
        rhs: r1Keypair.publicKey,
        result: r3Keypair.publicKey,
        payer: programProvider.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([r3Keypair])
      .rpc({ skipPreflight: true });

    account = await program.account.computation.fetch(r1Keypair.publicKey);
    expect(account.value.toString()).to.eql("20");
  });
});
