CREATE DATABASE petshops;

USE petshops;

create table tbl_usuarios(
	id_login int primary key auto_increment,
	email varchar(45) not null,
	senha varchar(100) not null,
    usuario varchar(45) not null,
	usuario_deletado boolean default false
);

create table tbl_cliente(
	id_cliente int primary key auto_increment,
    nome varchar(45) not null,
    cpf varchar(14) not null,
    nascimento date not null,
    sexo char(1) not null,
    telefone varchar(45) not null,
    email varchar(45) not null,
    cliente_deletado boolean default false
);

create table tbl_animal(
	id_animal int primary key auto_increment,
    nome_animal varchar(45) not null,
    especie varchar(45) not null,
    sexo_a varchar(45) not null,
    nascimento_a date not null,
    peso int(11) not null,
    FK_ID_Cliente int,
    CONSTRAINT FK_ID_Cliente foreign key(FK_ID_Cliente) references tbl_cliente(id_cliente),
    animal_deletado boolean default false
);

create table tbl_servico(
	id_servico int primary key auto_increment,
    descricao varchar(45) not null,
    valor_servico decimal(6,2) not null,
    tempo_servico time not null,
    servico_deletado boolean default false
);

create table tbl_funcionario(
	id_funcionario int primary key auto_increment,
    nome_f varchar(45) not null,
    cpf_f varchar(14) not null,
    funcionario_deletado boolean default false
);

create table animal_servico(
	FK_ID_Animal int not null,
    FK_ID_Servicos int not null,
    CONSTRAINT FK_ID_Animal foreign key(FK_ID_Animal) references tbl_animal(id_animal),
    CONSTRAINT FK_ID_Servicos foreign key(FK_ID_Servicos) references tbl_servico(id_servico),
    data_servico datetime not null,
    animal_servico_deletado boolean default false
);

create table tbl_compra(
	id_compra int primary key auto_increment,
    valor_total decimal(7,2) not null,
    data_atual datetime not null,
    FK_ID_Clientes int not null,
    FK_ID_Funcionarios int not null,
    CONSTRAINT FK_ID_Clientes foreign key(FK_ID_Clientes) references tbl_cliente(id_cliente),
    CONSTRAINT FK_ID_Funcionarios foreign key(FK_ID_Funcionarios) references tbl_funcionario(id_funcionario),
    compra_deletada boolean default false
    );

create table servico_funcionario(
	FK_ID_Servico int not null,
    FK_ID_Funcionario int not null,
    CONSTRAINT FK_ID_Servico foreign key(FK_ID_Servico) references tbl_servico(id_servico),
    CONSTRAINT FK_ID_Funcionario foreign key(FK_ID_Funcionario) references tbl_funcionario(id_funcionario),
    servico_funcionario_deletado boolean default false
);


select * from tbl_cliente;
select * from tbl_funcionario;
select * from tbl_compra;
select * from tbl_animal;
select * from tbl_servico;
select * from animal_servico;
select * from servico_funcionario;
select * from tbl_usuarios;