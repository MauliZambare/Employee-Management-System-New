package com.mauli.springboot.crud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.mauli.springboot.crud.entity.*;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

	
}
