import chalk from "chalk";
import inquirer from "inquirer";
import { getStagedDiff, makeCommit } from "../core/git.js";
import { generateCommitMessages } from "../core/ai.js";
import { readConfig } from "../core/config.js";

export async function runCommitCommand(options) {
  // 1️⃣ Check login first
  const { token } = readConfig();
  if (!token) {
    console.log(
      chalk.red("❌ You are not logged in.\n") +
      chalk.yellow("Run: ") + chalk.cyan("commitai login\n")
    );
    return;
  }

  console.log(chalk.cyan("🚀 Generating AI-powered commit message..."));

  // 2️⃣ Collect diff
  const diff = getStagedDiff();
  if (!diff.trim()) {
    console.log(chalk.red("❌ No staged changes found."));
    console.log(chalk.yellow("Run: git add <files>\n"));
    return;
  }

  // 3️⃣ Get messages from backend
  const suggestions = await generateCommitMessages(diff);

  // If backend failed or token invalid
  if (!suggestions || suggestions.length === 0) {
    console.log(chalk.red("❌ Failed to generate commit messages."));
    return;
  }

  // If backend returns fallback message (like wrong token)
  if (suggestions.length === 1 && suggestions[0].message.includes("fallback")) {
    console.log(chalk.red("❌ Could not generate commit messages."));
    console.log(chalk.yellow("Try logging in again:\n"));
    console.log(chalk.cyan("commitai login\n"));
    return;
  }

  // 4️⃣ Show suggestions
  console.log(chalk.yellow("\n💡 Commit Suggestions:\n"));
  suggestions.forEach((s) => {
    console.log(chalk.green(`${s.id}. ${s.message}`));
  });

  // 5️⃣ Let user choose one
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Select your commit message:",
      choices: suggestions.map((s) => ({
        name: s.message,
        value: s.message
      }))
    }
  ]);

  // 6️⃣ Commit or dry-run
  if (!options.dryRun) {
    makeCommit(choice);
  } else {
    console.log(chalk.gray("\n🧪 Dry run — did not commit.\n"));
  }
}

