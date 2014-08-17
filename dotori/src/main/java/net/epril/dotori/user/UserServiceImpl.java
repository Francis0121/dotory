package net.epril.dotori.user;

import java.util.HashMap;
import java.util.Map;


import org.mybatis.spring.support.SqlSessionDaoSupport;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl extends SqlSessionDaoSupport implements UserService {
	
	@Override
	public Map<String, Object> singin(User user) {
		User getUser = selectUserFromId(user.getData());
		if(getUser == null || getUser.getPn() == null || getUser.getPn().equals(0)){
			insertUser(user);
		}else{
			user.setPn(getUser.getPn());
		}
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("user", user);
		return map;
	}

	private User selectUserFromId(String data){
		return getSqlSession().selectOne("user.selectUserFromId", data);
	}
	
	private User insertUser(User user){
		getSqlSession().insert("user.insertUser", user);
		return user;
	}
}
