# DB     
## folder   
key | des | require 
--- | --- |---    
id | 自增主键 | y 
type | 文件夹类型 | y
foldername | 文件夹名 | y
username | 用户名 | y
create_date | 创建日期 | y   

## diary 
key | des | require
--- | --- |---
id | 自增主键 | y 
folderId | 所在folder的id | y
content | 日记内容 | y
pic | 图片（数组）（地址） | n
tag | 标签 | n
createDate | 创建日期 | y   

## phonebook     
key | des | require
--- | --- |---
id | 自增主键 | y 
folderId | 所在folder的id | y
contact | 联系人名称 | y
number | 电话号码 | y
createDate | 创建日期 | y   
 
## todolist     
key | des | require
--- | --- |---
id | 自增主键 | y 
folderId | 所在folder的id | y
state | 事项状态（未完成0 完成1） | y
content | 事项内容 | y
createDate | 创建日期 | y   


