# API doc
## 用户登陆         
    接口地址：/api/login   
    请求方式：post  
    请求参数说明：
key | des | require 
--- | --- |---    
name | 用户名 | y 
password | 密码 | y
---
## 用户注册
    接口地址：/api/register  
    请求方式：post  
    请求参数说明：
key | des | require 
--- | --- |---    
name | 用户名 | y 
password | 密码 | y 
email | 电邮 | y
mobile | 手机 | y
gender | 性别 | y
---
## 当前用户新建文件夹
    接口地址：/api/folder   
    请求方式：post  
    请求参数说明：
key | des | require 
--- | --- |---    
type | 文件夹类型 | y
foldername | 文件夹名 | y
create_date | 创建日期 | y   
---
## 获取当前用户的文件夹列表
    接口地址：/api/folder   
    请求方式：get
---
## 更新指定文件夹名字
    接口地址：/api/folder/:id 
    请求方式：put
    请求参数说明：
key | des | require 
--- | --- |---    
foldername | 文件夹名 | y
---
## 删除指定文件夹
    接口地址：/api/folder/:id   
    请求方式：delete
---
## 新增一篇日记
    接口地址：/api/diary
    请求方法：post  
key | des | require | type
--- | --- |--- |---
folderId | 所在folder的id | y | String
title | 日记标题 | y | String
content | 日记内容 | y | String
pic | 图片（地址） | n | Array
mood | 心情 | y | String
weather | 天气 | y | String
bookmark | 书签 | n | boolean
tag | 标签 | n | String
createDate | 创建日期 | y | String(YYYY-MM-DD)
---
## 获取一篇日记内容
    请求地址：/api/diary/:id
    请求方式：get  
---
## 删除一篇日记
    接口地址：/api/diary/:id   
    请求方式：delete
---
## 新增一条通讯录
    接口地址：/api/phonebook
    请求方式：post  
key | des | require
--- | --- |---
folderId | 所在folder的id | y
contact | 联系人名称 | y
number | 电话号码 | y
createDate | 创建日期 | y   
---
## 获取一条通讯录
    接口地址：/api/phonebook/:id
    请求方式：get  
---
## 修改一条通讯录
    接口地址：/api/phonebook/:id
    请求方式：put  
---
## 删除一条通讯录
    接口地址：/api/phonebook/:id
    请求方式：delete
---
## 新增一条待办事项
    接口地址：/api/todolist
    请求方式：post
key | des | require
--- | --- |---
folderId | 所在folder的id | y
state | 事项状态（未完成0 完成1） | y
content | 事项内容 | y
createDate | 创建日期 | y  
---
## 获取一条待办事项
    接口地址：/api/todolist/:id
    请求方式：get    
---
## 修改一条待办事项
    接口地址：/api/todolist/:id
    请求方式：put  
---
## 删除一条待办事项
    接口地址：/api/todolist/:id
    请求方式：delete  
---

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

