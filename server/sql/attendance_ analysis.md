部门：
  部门 Name
  部门 Id
  部门上午上班时间 Time
  部门下午上班时间 Time

员工:
  员工 Name
  员工 Gender <男,女>
  员工 Id
  员工所属部门 Id

缺勤/旷工:
  Id
  员工 Id
  缺勤/旷工日期 Date

请假:
  Id
  员工 Id
  部门 Id
  请假原因 Reason
  请假开始时间 Date
  请假结束时间 Date
  批准状态 boolean
 
//表名
employee<br>
Id Gender Name DepartmentId<br>
department<br>
Id Name WorkingHoursAM WorkingHoursPM<br>
attendance<br>
Id EmployeeId NotAttendanceDate<br>
leave<br>
Id DepartmentId Reason StartDate EndDate State
