/*
 * @Author: Harry 
 * @Date: 2019-10-04 00:36:27 
 * @Last Modified by: Harry-mac
 * @Last Modified time: 2019-10-04 14:35:46
 */


export default {
    namespaced:true,
    state: {
        user:null,
        username:null,
        nickname:null,
        role:null,
        id:null,
        rolename:null,
        isLogin:false
    },
    getters:{
        getUsername(state){
            if(!state.username){
                state.user = JSON.parse(localStorage.getItem("user"))
                if(state.user)
                    state.username = state.user.username;
            }
            return state.username;
        },
        getNickname(state){
            if(!state.nickname){
                state.user = JSON.parse(localStorage.getItem("user"))
                if(state.user)
                state.nickname = state.user.nickname;
            }
            return state.nickname;
        },
        getRole(state){
            if(!state.role){
                state.user = JSON.parse(localStorage.getItem("user"))
                if(state.user)
                state.role = getRealRole(state.user.authorities);
            }
            return state.role;
        },
        getRolename(state){
            if(!state.rolename){
                state.user = JSON.parse(localStorage.getItem("user"))
                if(state.user)
                    state.rolename = getRoleName(getRealRole(state.user.authorities));
            }
            return state.rolename;
        },
        getId(state){
            if(!state.id){
                state.user = JSON.parse(localStorage.getItem("user"))
                if(state.user)
                state.id = state.user.id;
            }
            return state.id;
        },
        getIsLogin(state){
            if(!state.isLogin){
                state.isLogin = localStorage.getItem("isLogin") == null ? state.isLogin : localStorage.getItem("isLogin");
            }
            return state.isLogin;
        }
    },
    mutations: {
        setUsername(state,val){
            state.username = val
        },
        setNickname(state,val){
            state.nickname = val
        },
        setRole(state,val){
            state.role = getRealRole(val)
            state.rolename = getRoleName(state.role);
        },
        setId(state,val){
            state.id = val
        },
        setIsLogin(state,val){
            state.isLogin = val
        },
        cleanInfo(state){
            state.user = null;
            state.nickname = null;
            state.role = null;
            state.rolename = null;
            state.id = null;
            state.isLogin = false;
        }
    },
    actions: {
  
    }
  }

  function getRealRole(authorities){
      let len = authorities.length;
    
      let tp = [];

      for(let i = 0;i < len;i++){
          tp[i] = authorities[i].authority
      }

      return tp;
  }

  function getRoleName(role){
      let len = role.length;
      if(len == 1){
          return "业主";
      }
      else if(len == 2){
          return "物业管理员";
      }
      else if(len == 3){
          return "系统管理员";
      }
  }