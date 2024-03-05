import { execa } from 'execa';

// Other import statements remain the same
import path from 'path';
import packlist from 'npm-packlist';
import tar from 'tar';
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const fileContents = await fsPromises.readFile('package.json', 'utf8');
const packageJson = JSON.parse(fileContents);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = path.join(__dirname, '../');
const srcRoot = path.join(projectRoot, 'src');

const libRoot = path.join(projectRoot, 'lib');
const esmRoot = path.join(libRoot, 'esm');

const shell = (cmd) =>
    execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

const babel = (outDir, envName) =>
    shell(
        `npx babel ${srcRoot} --out-dir ${outDir} --env-name "${envName}"`,
    );

const createZip = () => {
    return packlist({ path: projectRoot })
        .then(files => tar.create({
            prefix: 'package/',
            cwd: projectRoot,
            file: `react-nmi-collectjs-v${packageJson.version}.tgz`,
            gzip: true
        }, files))
}

Promise.resolve(true)
    .then(() =>
        Promise.all([
             babel(esmRoot, 'esm'),
        ]),
    )
    .then(() => {
        // createZip()
    })
    .catch((err) => {
        if (err) console.error(err.stack || err.toString());
        process.exit(1);
    });
