'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = async function (db) {
  return await db.createTable('url_shortener', {
    short_code: { type: 'char', length: 6, primaryKey: true, notNull: true, unique: true },
    custom_name: { type: 'string', length: 255, unique: true },
    original_url: { type: 'text', notNull: true },
    visit_url_count: { type: 'int', defaultValue: 0 },
    last_visit_url: { type: 'timestamp' }
  }, () => {
    db.addIndex('url_shortener', 'url_shortener_index', ['short_code', 'custom_name', 'last_visit_url']);
  });
};

exports.down = async function (db) {
  return await db.dropTable('url_shortener', () => {
    db.removeIndex('url_shortener', 'url_shortener_index');
  });
};

exports._meta = {
  "version": 1
};
