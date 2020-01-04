use ljw_db;
create table attendance (
  Id bigint not null primary key identity(0,1),
  EmployeeId bigint not null,
  EmployeeName nvarchar(20),
  DepartmentId bigint not null,
  AttendDate nvarchar(128),
  State nvarchar(20)
)