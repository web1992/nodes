const fs = require('fs');
const path = require('path');
const table_name = 'test';
const comment = 'test';

fs.readFile(path.join(__dirname, 'sql.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    //console.log(data);
    lines = data.split('\r\n');

    getFixFields();
    for (let lineIndex in lines) {
        //console.log(data);
        let line = lines[lineIndex];
        if (new String(line).length <= 0) {
            continue;
        }
        let f = line.replace('\t', '').split(' ');
        let _filed = f[0];
        let _comment = f[1];
        const templateField = `${_filed} VARCHAR(128) DEFAULT NULL COMMENT '${_comment}',\n`;
        console.log(templateField);
    }
    getCommonFields();
    // console.log(fileds);
});


function getFixFields() {

    let f = `
CREATE TABLE ${table_name} (
oid BIGINT(20) NOT NULL AUTO_INCREMENT,
repay_txn_id BIGINT(20) DEFAULT NULL COMMENT 'repay_txn_id',
service VARCHAR(128) DEFAULT NULL COMMENT 'service',
version VARCHAR(8) DEFAULT NULL COMMENT 'version',
`
    console.log(f);
}




function getCommonFields() {

    let f = `
remark VARCHAR(128) DEFAULT NULL COMMENT '备注',
batch_no VARCHAR(64) DEFAULT NULL COMMENT '批处理号',
exclusive_code VARCHAR(64) DEFAULT NULL COMMENT '排他编码',
created_at DATETIME DEFAULT NULL COMMENT '创建时间',
updated_at DATETIME DEFAULT NULL COMMENT '更新时间',
created_by VARCHAR(64) DEFAULT NULL COMMENT '创建人',
updated_by VARCHAR(64) DEFAULT NULL COMMENT '修改人',
delete_flag char(1) DEFAULT NULL COMMENT '删除标记',
PRIMARY KEY (oid)
)  COMMENT='${comment}';
                `
    console.log(f);
}