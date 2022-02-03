'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Db = void 0;
const typeorm_config_1 = require('@subsquid/typeorm-config');
const assert_1 = __importDefault(require('assert'));
const typeorm_1 = require('typeorm');
class Db {
  constructor(con) {
    this.con = con;
  }
  static async connect() {
    let cfg = (0, typeorm_config_1.createOrmConfig)();
    let con = await (0, typeorm_1.createConnection)(cfg);
    return new Db(con);
  }
  init(processor) {
    // FIXME: validate processorName, version checking, etc...
    let schema = `"${processor}_status"`;
    return this.con.transaction(async (em) => {
      await em.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
      await em.query(`
              CREATE TABLE IF NOT EXISTS ${schema}."status" (
                id int primary key,
                height int not null
              )
            `);
      let status = await em.query(
        `SELECT height FROM ${schema}.status WHERE id = 0`
      );
      if (status.length == 0) {
        await em.query(
          `INSERT INTO ${schema}.status (id, height) VALUES (0, -1)`
        );
        return { height: -1 };
      } else {
        return status[0];
      }
    });
  }
  transact(processor, blockNumber, cb) {
    let schema = `"${processor}_status"`;
    return this.con.transaction('REPEATABLE READ', async (em) => {
      let status = await em.query(`SELECT height FROM ${schema}.status`);
      (0, assert_1.default)(status.length == 1);
      (0, assert_1.default)(status[0].height < blockNumber);
      let store = em;
      store.get = em.findOne;
      await cb(store);
      await em.query(`UPDATE ${schema}.status SET height = $1`, [blockNumber]);
    });
  }
  async setHeight(processor, blockNumber) {
    let schema = `"${processor}_status"`;
    await this.con.query(
      `UPDATE ${schema}.status SET height = $1 WHERE height < $1`,
      [blockNumber]
    );
    // TODO: update assertion
  }
  close() {
    return this.con.close();
  }
}
exports.Db = Db;
//# sourceMappingURL=db.js.map
