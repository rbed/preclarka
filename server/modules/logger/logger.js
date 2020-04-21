const logSymbols = require('log-symbols');
const figures = require('figures');
const chalk = require('chalk');
const fs = require('fs')
const path = require('path')

module.exports = class logger {
   constructor(emoji = true) {
      this.emoji = emoji;
   }

   static setEmoji(enable) {
      this.emoji = enable;
   }

   static info(info, description) {
      let sign = this.emoji ? chalk.blueBright(' ℹ️ ') : logSymbols.info;
      console.log(
         sign + '   ' + chalk.bold.blueBright(info),
         this._descriptionBuilder(description)
      );
   }

   static success(info, description) {
      let sign = this.emoji ? '✔️' : logSymbols.success;
      console.log(
         sign + '   ' + chalk.bold.green(info),
         this._descriptionBuilder(description)
      );
   }
   static warning(info, description) {
      let sign = this.emoji ? '⚠️' : logSymbols.warning;
      console.log(
         sign + '   ' + chalk.bold.rgb(255, 136, 0)(info),
         this._descriptionBuilder(description)
      );
   }
   static error(info, description) {
      let sign = this.emoji ? '❌' : logSymbols.error;
      console.log(
         sign + '   ' + chalk.bold.red(info),
         this._descriptionBuilder(description)
      );
   }

   static critical(info, description) {
      console.log(
         '🔥' + '  ' + chalk.bold.red(info),
         this._descriptionBuilder(description)
      );
   }

   static important(info, description) {
      let sign = this.emoji ? '🌟' : figures.pointer.repeat(3);
      console.log(
         chalk.white(sign + ' ' + info, this._descriptionBuilder(description))
      );
   }

   static status(info, status) {
      const INFO_LINE_LENGHT = 60;
      var dot = '.';
      var dots = dot.repeat(INFO_LINE_LENGHT - String(info).length);
      console.log(chalk.white(info + dots) + this._statusBuilder(status));
   }
   
   static _statusBuilder(status) {
      status = String(status);
      status = status.toUpperCase();

      var _status;

      var s = chalk.white('[');
      var e = chalk.white(']');

      if (status == 'RUN') {
         _status = chalk.green(status);
      }
      if (status == 'OK' || status === 1 || status === 'STARTED') {
         _status = chalk.green('STARTED');
      }
      if (status === 'INIT' || status === 'STARTED' || status === 0) {
         _status = chalk.blueBright(status);
      }
      if (status == 'ERR' || status == 'ERROR') {
         _status = chalk.red(status);
      } else {
         _status = chalk.white(status);
      }

      return s + _status + e;
   }

   static _descriptionBuilder(description) {
      if (typeof description === 'object') {
         let _description =
            ' : ' +
            chalk.white(
               require('util').inspect(description, {
                  colors: true,
                  depth: null
               })
            );
         return _description;
      }

      if (description) return ' : ' + description;

      return '';
   }

   static pringAppLogo() {
      const logo = fs.readFileSync(path.join(__dirname, 'logo.txt')) 
      const author = 'Radosław Bednarz';
      const coAuthor = 'Rafał Cymbalista';
      const version = require('../../package.json').version
      const newLine = '\n';
      const lineSeparator = new String('_').repeat(69);
      const sign =
         newLine +
         `                                 by ${author}` +
         newLine +
         `                                and ${coAuthor}` +
         newLine +
         '                             (R) all rights reserved' +
         newLine +
         lineSeparator +
         newLine;
      console.log(
         chalk.white(lineSeparator + logo + lineSeparator) +
            newLine +
            chalk.gray(sign)
      );
      this.status('APP_VERSION', version);
      this.status('APP', 'started');
   }
};

