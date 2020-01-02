use ljw_db
go

create table employee 
(
  Id bigint not null primary key identity(0,1),
  Gender nvarchar(10) not null,
  Name nvarchar(20) default '',
  DepartmentId bigint default '000000', 
)
go

create table department
(
  Id bigint not null primary key identity(0,1),
  Name nvarchar(20) default '',
  WorkingHoursAM time default '08:00',
  WorkingHoursPM time default '18:00',
)
go

create table attendance
(
  Id bigint not null primary key identity(0,1),
  EmployeeId bigint not null,
  NotAttendanceDate date not null
)
go

create table leave
(
  Id bigint not null primary key identity(0,1),
  DepartmentId bigint not null,
  Reason nvarchar(256) default '',
  StartDate date not null,
  EndDate date not null,
  State nvarchar(20)
)
go