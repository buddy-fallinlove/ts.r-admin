import service from './index'
import qs from 'qs'

export default {
  // 登录
  login({ username, password }: {username: string, password: string}) {
    return service.post('login', {
      username,
      password,
    });
  },
  // 用户数据列表
  getUsers({ pagenum = 1, pagesize = 10, query }: {pagenum: number, pagesize: number, query?: string}) {
    if (query) {
      return service.get(
        `users?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`,
      );
    } else {
      return service.get(`users?pagenum=${pagenum}&pagesize=${pagesize}`);
    }
  },

  // 添加用户
  addUser({ username, password, email, mobile}: {username:string, password: string, email: string, mobile: string}) {
    return service.post('users', {
      username,
      password,
      email,
      mobile,
    });
  },

  // 修改用户状态
  updateUserState({ uId, type }: {uId: number | string, type: string}) {
    return service.put(`users/${uId}/state/${type}`);
  },

  // 根据 ID 查询用户信息
  getUserByID({ id }: {id: number}) {
    return service.get(`users/${id}`);
  },

  // 编辑用户提交
  updateUser({ uId, email, mobile }: {uId: number, email?: string, mobile?: string}) {
    return service.put(`users/${uId}`, {
      email,
      mobile,
    });
  },

  // 删除单个用户
  deleteUser(id: number) {
    return service.delete(`users/${id}`);
  },
  // 分配用户角色
  serUserRole({ id, rid }: {id: number, rid: number}) {
    return service.put(`users/${id}/role`, {
      rid,
    });
  },

  // 所有权限列表
  allRights(type: string) {
    return service.get(`rights/${type}`);
  },

  // 左侧菜单权限
  getMenus() {
    return service.get('menus');
  },

  // 角色列表
  getRole() {
    return service.get('roles');
  },

  // 添加角色
  addRole({ roleName, roleDesc = '' }: {roleName: string, roleDesc: string}) {
    return service.post('roles', {
      roleName,
      roleDesc,
    });
  },

  // 删除角色
  deleteRole(id: number) {
    return service.delete(`roles/${id}`);
  },

  // 编辑角色
  updateRole({ id, roleName, roleDesc = '' }: {id: number, roleName: string, roleDesc?: string}) {
    return service.put(`roles/${id}`, {
      roleName,
      roleDesc,
    });
  },

  // 角色授权
  setRoles({ roleId, rids }: {roleId: number, rids: number[]}) {
    return service.post(`roles/${roleId}/rights`, qs.stringify({ rids }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
  },

  // 删除角色指定权限
  deleteRights({ roleId, rightId }: {roleId:number, rightId: number}) {
    return service.delete(`roles/${roleId}/rights/${rightId}`);
  },

  // 商品分类数据列表
  getCategory({ type, pagenum, pagesize }: {type: string, pagenum?: number, pagesize?:number}) {
    if (type && !pagesize && !pagenum) {
      return service.get(`categories?type=${type}`);
    } else {
      return service.get(
        `categories?type=${type}&pagenum=${pagenum}&pagesize=${pagesize}`,
      );
    }
  },

  // 添加分类
  addCategories({ cat_pid, cat_name, cat_level }: {cat_pid: number, cat_name: string, cat_level: string}) {
    return service.post('categories', {
      cat_pid,
      cat_name,
      cat_level,
    });
  },

  // 删除分类
  deleteCategory(id: number) {
    return service.delete(`categories/${id}`);
  },

  // 编辑分类
  updateCategory({ id, cat_name }: {id: number, cat_name: string}) {
    return service.put(`categories/${id}`, {
      cat_name,
    });
  },

  // 参数列表
  getAttrs({ id, sel }: {id: number, sel: string}) {
    return service.get(`categories/${id}/attributes?sel=${sel}`);
  },

  // 编辑提交参数
  editAttrs({ id, attrId, attr_name, attr_sel, attr_vals }: {
    id: number, attrId: number, attr_name: string, attr_sel: string, attr_vals: string 
  }) {
    return service.put(`categories/${id}/attributes/${attrId}`, {
      attr_name,
      attr_sel,
      attr_vals,
    });
  },

  // 添加动态参数或者静态属性
  addAttrs({ id, attr_name, attr_sel }: {id: number, attr_name: string, attr_sel: string}) {
    return service.post(`categories/${id}/attributes`, {
      attr_name,
      attr_sel,
    });
  },

  //  删除参数
  deleteAttr({ id, attrid }: {id: number, attrid: number}) {
    return service.delete(`categories/${id}/attributes/${attrid}`);
  },

  // 商品列表数据
  getGoods({ pagenum, pagesize, query }: {pagenum: number, pagesize: number, query?: string}) {
    if (query) {
      return service.get(
        `goods?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`,
      );
    } else {
      return service.get(`goods?pagenum=${pagenum}&pagesize=${pagesize}`);
    }
  },

  // 删除商品
  deleteGood(id: number) {
    return service.delete(`goods/${id}`);
  },

  // 编辑商品
  updateGood({ id, goods_name, goods_price, goods_number, goods_weight }: any) {
    return service.put(`goods/${id}`, {
      goods_name,
      goods_number,
      goods_price,
      goods_weight,
    });
  },

  // 添加商品
  addGoods({
    goods_name,
    goods_cat,
    goods_price,
    goods_number,
    goods_weight,
    goods_introduce,
    pics,
    attrs,
  }: {
    goods_name: string,
    goods_cat: string
    goods_price: string
    goods_number: string | number
    goods_weight:string | number 
    goods_introduce: string
    pics: string
    attrs: string[]
  }) {
    return service.post('goods', {
      goods_name,
      goods_cat,
      goods_price,
      goods_number,
      goods_weight,
      goods_introduce,
      pics,
      attrs,
    });
  },

  // 获取订单
  getOrders({ query, pagenum, pagesize }: {pagenum: number, pagesize: number, query?: string}) {
    if (query) {
      return service.get(
        `orders?pagenum=${pagenum}&pagesize=${pagesize}&query=${query}`,
      );
    } else {
      return service.get(`orders?pagenum=${pagenum}&pagesize=${pagesize}`);
    }
  },

  // 查看订单详情
  orderDetail(id: number) {
    return service.get(`orders/${id}`);
  },

  // 查看物流信息
  getLogistics(id: number) {
    return service.get(`/kuaidi/${id}`);
  },

  // 获取数据报表
  getReports() {
    return service.get('reports/type/1');
  },
};