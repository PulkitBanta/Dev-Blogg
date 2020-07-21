package com.pukitbanta.springblog.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pukitbanta.springblog.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

}
