package com.pukitbanta.springblog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pukitbanta.springblog.dto.RegisterRequest;
import com.pukitbanta.springblog.model.User;
import com.pukitbanta.springblog.repository.UserRepository;

@Service
public class AuthService {

	@Autowired
	private UserRepository userRepository;
	
	public void signup(RegisterRequest registerRequest) {
		User user = new User();
		user.setUserName(registerRequest.getUsername());
		user.setEmail(registerRequest.getEmail());
		user.setPassword(registerRequest.getPassword());
		
		userRepository.save(user);
	}
	
}
