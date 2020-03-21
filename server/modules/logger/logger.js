const logSymbols = require('log-symbols');
//const figures = require('figures');
const chalk = require('chalk');

module.exports = class logger {

   static info(info, description) {
      console.log(
         logSymbols.info + "  " + chalk.blueBright(info) + this._descriptionBuilder(description)
      )
   }

   static success(info, description) {
      console.log(
         logSymbols.success + "  " + chalk.green(info) + this._descriptionBuilder(description)
      )
   }

   static warning(info, description) {
      console.log(
         logSymbols.warning + "  " + chalk.rgb(255, 136, 0)(info) + this._descriptionBuilder(description)
      )
   }

   static error(info, description) {
      console.log(
         logSymbols.error + "  " + chalk.red(info) + this._descriptionBuilder(description)
      )
   }


   static critical(info, description) {
      console.log(
         '🔥' + "  " + chalk.red(info) + this._descriptionBuilder(description)
      )
   }

   static important(info, description) {
      console.log(
         chalk.white.underline("!  " + info + this._descriptionBuilder(description))
      )
   }

   static status(info, status) {
      const INFO_LINE_LENGHT = 60
      var dot = "."
      var dots = dot.repeat(INFO_LINE_LENGHT - String(info).length)
      console.log(
         chalk.white(info + dots) + this._statusBuilder(status)
      )
   }

   static _statusBuilder(status) {

      status = String(status)
      status = status.toUpperCase()

      var _status

      var s = chalk.white("[")
      var e = chalk.white("]")

      if (status == 'RUN') {
         _status = chalk.green(status)
      }
      if (status == 'OK' || status === 1) {
         _status = chalk.green('OK')
      }
      if (status == 'ERR' || status == 'ERROR') {
         _status = chalk.red(status)
      }
      else {
         _status = chalk.white(status)
      }

      return s + _status + e

   }

   static _descriptionBuilder(description) {
      if (description) return " : " + description
      return ""
   }

   static pringAppLogo() {
      const logo =
         "\n" +
         " ______   __  __   ______   ______   ______  " + '\n' +
         "/\\  ___\\ /\\ \\_\\ \\ /\\  __ \\ /\\  ___\\ /\\__  _\\ " + '\n' +
         "\\ \\ \\__ \\\\ \\  __ \\\\ \\ \\/\\ \\\\ \\___  \\\\/_/\\ \\/ " + '\n' +
         " \\ \\_____\\\\ \\_\\ \\_\\\\ \\_____\\\\/\\_____\\  \\ \\_\\ " + '\n' +
         "  \\/_____/ \\/_/\\/_/ \\/_____/ \\/_____/   \\/_/ " + '\n' +
         "" + '\n'
      const author = 'Rafal Cymbalista'
      const sign =
         `                        by ${author}` + '\n' +
         "                        all rights reserved" + '\n'
      console.log(
         chalk.white(logo) +
         chalk.gray(sign)
      )
   }

}
