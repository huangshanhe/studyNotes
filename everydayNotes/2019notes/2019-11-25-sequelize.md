# sequelize to v5相关 #

Sequelize 是 Node 的一个 ORM(Object-Relational Mapping) 框架，用来方便数据库操作。

Sequelize v5 将仅支持 Node 6 以及更高版本

underscoredAll 和 underscored 选项都合并为一个 underscored 选项
现在，所有属性都默认使用 camelcase 命名生成。 将 underscored选项设置为 true，属性的 field 选项将被设置为属性名称的下划线版本。
underscored 将控制所有属性，包括时间戳，版本和外键。 它不会影响任何已经指定 field 选项的属性。

## 注意: underscored:true 只适用于createAt updateAt字段（这两个字段是Sequelize自动添加的），其他字段没有作用。https://github.com/sequelize/sequelize/issues/6423 ##
