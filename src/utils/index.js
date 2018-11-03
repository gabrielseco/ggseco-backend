import util from 'util';
const exec = util.promisify(require('child_process').exec);

export async function executeCommand(command) {
  async function ls() {
    const { stdout, stderr } = await exec(command);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  }
  ls();
}