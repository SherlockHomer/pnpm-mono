// 使用了 ESM 写法，所以文件后缀名改为 mjs
import chalk from 'chalk';
import { readFileSync } from 'fs';
import path from 'path';

const msgPath = path.resolve('.git/COMMIT_EDITMSG');
const msg = readFileSync(msgPath, 'utf-8').trim();

const commitRE =
  /^(revert|feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?: .{1,95}/;

if (msg.indexOf('Merge branch') > -1) {
  console.log();
  console.log(chalk.green('Ignore Merge branch way'));
  console.log();
  process.exit(0);
}

if (!commitRE.test(msg)) {
  console.log();
  console.error(
    ` ${chalk.bgRed.white(' ERROR ')} `,
    chalk.red('  invalid commit message format.\n\n'),

    chalk.red(
      'Proper commit message format is required for automated changelog generation. Examples:\n\n'
    ),

    chalk.green("feat(packageName): add 'comments' option\n"),
    chalk.green(`fix: I fix something for all packages\n\n`),

    chalk.bgYellow.white(`  Hey!  `),
    '  Why not use "npm run commit" to help you?\n'
  );
  process.exit(1);
} else {
  console.log();
  console.log(chalk.green('👍 You are a good Commitizen!'));
  console.log();
}
