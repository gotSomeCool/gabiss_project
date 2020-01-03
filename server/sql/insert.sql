use ljw_db;
create table leave (
  Id bigint not null primary key identity(0,1),
  EmployeeId bigint not null,
  EmployeeName nvarchar(20),
  DepartmentId bigint not null,
  DepartmentName nvarchar(20),
  Reason nvarchar(256) default '',
  StartDate date not null,
  EndDate date not null,
  State nvarchar(20)
)