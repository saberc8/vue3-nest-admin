/*
 Navicat Premium Data Transfer

 Source Server         : gin
 Source Server Type    : MySQL
 Source Server Version : 80031 (8.0.31)
 Source Host           : localhost:3306
 Source Schema         : nestjs-rbac

 Target Server Type    : MySQL
 Target Server Version : 80031 (8.0.31)
 File Encoding         : 65001

 Date: 17/01/2023 16:30:01
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单名称',
  `title` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单标题',
  `path` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '菜单路径',
  `icon` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '菜单图标',
  `redirect` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '菜单定向/父级才有',
  `pid` int NOT NULL DEFAULT 0 COMMENT '父级菜单id',
  `order_no` tinyint NOT NULL DEFAULT 0 COMMENT '菜单排序',
  `frame_src` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '内嵌iframe',
  `keep_alive` tinyint NOT NULL DEFAULT 1 COMMENT '是否缓存',
  `hide_menu` tinyint NOT NULL DEFAULT 0 COMMENT '是否显示菜单',
  `hide_breadcrumb` tinyint NOT NULL DEFAULT 0 COMMENT '是否显示面包屑',
  `component` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '菜单组件',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_51b63874cdce0d6898a0b2150f`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, '2023-01-17 14:31:30.489718', '2023-01-17 15:02:59.845295', NULL, 'Workbench', '项目介绍', 'workbench', 'ion:grid-outline', '/dashboard/workbench', 0, 0, '', 1, 0, 0, 'LAYOUT');
INSERT INTO `menu` VALUES (2, '2023-01-17 15:02:40.065911', '2023-01-17 15:02:57.271092', NULL, 'Level', 'level', '/level', 'carbon:user-role', '/level/menu1/menu1-1', 0, 0, '', 1, 0, 0, 'LAYOUT');
INSERT INTO `menu` VALUES (3, '2023-01-17 15:05:44.529242', '2023-01-17 15:06:43.340995', NULL, 'Menu1Demo', 'Menu1', 'menu1', '', '', 2, 0, '', 1, 0, 0, '');
INSERT INTO `menu` VALUES (4, '2023-01-17 15:11:24.575526', '2023-01-17 15:36:11.421830', NULL, 'Menu11Demo', 'Menu1-1', 'menu1-1', '', '', 3, 0, '', 1, 0, 0, '');
INSERT INTO `menu` VALUES (5, '2023-01-17 15:13:15.342956', '2023-01-17 15:42:45.971022', NULL, 'Menu111Demo', 'Menu111', 'menu1-1-1', '', '', 4, 0, '', 1, 0, 0, '/demo/level/Menu111');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '角色名称',
  `remark` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '备注',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_ae4578dcaed5adff96595e6166`(`name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, '2009-06-21 16:45:04.000000', '2023-01-17 15:35:26.123725', NULL, '管理员', 'w7EJT7DJCM');
INSERT INTO `role` VALUES (2, '2012-11-05 08:42:00.000000', '2023-01-17 15:35:36.975272', NULL, '角色1', 'WuI4AczRy2');
INSERT INTO `role` VALUES (3, '2016-06-28 11:32:10.000000', '2023-01-17 15:35:43.573048', NULL, '角色2', 'mdQPZ3Pl4s');

-- ----------------------------
-- Table structure for role_menus_menu
-- ----------------------------
DROP TABLE IF EXISTS `role_menus_menu`;
CREATE TABLE `role_menus_menu`  (
  `roleId` bigint NOT NULL,
  `menuId` bigint NOT NULL,
  PRIMARY KEY (`roleId`, `menuId`) USING BTREE,
  INDEX `IDX_eec9c5cb17157b2294fd9f0edb`(`roleId` ASC) USING BTREE,
  INDEX `IDX_f1adc6be166630ee2476d7bbf0`(`menuId` ASC) USING BTREE,
  CONSTRAINT `FK_eec9c5cb17157b2294fd9f0edbf` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_f1adc6be166630ee2476d7bbf09` FOREIGN KEY (`menuId`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menus_menu
-- ----------------------------
INSERT INTO `role_menus_menu` VALUES (1, 2);
INSERT INTO `role_menus_menu` VALUES (1, 3);
INSERT INTO `role_menus_menu` VALUES (1, 4);
INSERT INTO `role_menus_menu` VALUES (1, 5);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `deleted_at` timestamp(6) NULL DEFAULT NULL COMMENT '软删除时间',
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nickname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户昵称',
  `avatar` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '' COMMENT '用户头像',
  `is_super` tinyint NOT NULL DEFAULT 0 COMMENT '是否为超级管理员1表示是,0表示不是',
  `status` tinyint NOT NULL DEFAULT 1 COMMENT '用户状态1表示正常,0表示禁止',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `IDX_78a916df40e02a9deb1c4b75ed`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '2023-01-16 16:30:52.603262', '2023-01-17 11:22:32.821859', NULL, 'admin', '$2a$10$cX4SJF/0x.HAocaTmAoIR.Zso61yWj3jWSieD9TpQvBZlCviMSOai', '系统管理员', 'https://www.saberc8.cn/img/moren.jpg', 1, 1);

-- ----------------------------
-- Table structure for user_roles_role
-- ----------------------------
DROP TABLE IF EXISTS `user_roles_role`;
CREATE TABLE `user_roles_role`  (
  `userId` bigint NOT NULL,
  `roleId` bigint NOT NULL,
  PRIMARY KEY (`userId`, `roleId`) USING BTREE,
  INDEX `IDX_5f9286e6c25594c6b88c108db7`(`userId` ASC) USING BTREE,
  INDEX `IDX_4be2f7adf862634f5f803d246b`(`roleId` ASC) USING BTREE,
  CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_roles_role
-- ----------------------------
INSERT INTO `user_roles_role` VALUES (1, 2);
INSERT INTO `user_roles_role` VALUES (1, 3);

SET FOREIGN_KEY_CHECKS = 1;
