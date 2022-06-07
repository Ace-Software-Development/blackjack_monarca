/**
 * internetConnection
 * @description checks if the website have internet
 */
function internetConnection() {
    window.ononline = () => {
        console.log('Conectado a internet');
    };
    window.onoffline = () => {
        window.costumAlert('No tienes conexión a internet');
    };
}
export default internetConnection();
