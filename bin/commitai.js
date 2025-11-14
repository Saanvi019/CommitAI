#!/usr/bin/env node
import { Command } from "commander";
import { runCommitCommand } from "../src/commands/commit.js";

const program = new Command();

program
  .name("commitai")
  .description("AI-powered commit message generator")
  .version("1.0.0");

// -------------------
// LOGIN COMMAND
// -------------------
program
  .command("login")
  .description("Login to CommitAI using GitHub")
  .action(async () => {
    const module = await import("../src/commands/login.js");
    module.default();
  });

// -------------------
// COMMIT COMMAND
// -------------------
program
  .command("commit")
  .description("Generate AI commit messages")
  .option("--dry-run", "Preview messages without committing")
  .action(runCommitCommand);

program.parse(process.argv);
