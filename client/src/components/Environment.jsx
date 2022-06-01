/**
 * Environment
 * @description Function value is localhost when developing and null in deploy
 * @returns URL of database
 */
export default function Environment() {
    const key = 'http://localhost:8888';
    // const key = '';
    return key;
}
