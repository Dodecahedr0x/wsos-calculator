use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("7MDVqq52Am3UYcdF3N1FyqCBXNRvkJsoBLzhhVA9Vi5d");

#[program]
pub mod calculator {
    use super::*;

    pub fn constant(ctx: Context<Constant>, initial_value: i64) -> ProgramResult {
        let result = &mut ctx.accounts.result;
        result.value = initial_value;
        Ok({})
    }

    pub fn add(ctx: Context<Addition>) -> ProgramResult {
        let result = &mut ctx.accounts.result;
        result.value = ctx.accounts.lhs.value + ctx.accounts.rhs.value;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Constant<'info> {
    #[account(init, payer=payer, space=Computation::LEN)]
    pub result: Account<'info, Computation>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Addition<'info> {
    pub lhs: Account<'info, Computation>,
    pub rhs: Account<'info, Computation>,
    #[account(init, payer=payer, space=Computation::LEN)]
    pub result: Account<'info, Computation>,

    #[account(mut)]
    pub payer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Computation {
    value: i64,
}

impl Computation {
    pub const LEN: usize = 8 + 8;
}
