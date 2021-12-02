################################################################################# CRIANDO VIEWS ##############################################################################

################################################################################# CLIENTE ##############################################################################

create view vw_cliente as 
	SELECT * FROM tbl_cliente;

################################################################################# ANIMAL ##############################################################################

create view vw_animal as
	SELECT * from tbl_animal
	JOIN tbl_cliente ON id_cliente = FK_ID_Cliente;

################################################################################# COMPRA ##############################################################################

create view vw_compra as
	SELECT * from tbl_compra
	JOIN tbl_cliente ON id_cliente = FK_ID_Clientes
    JOIN tbl_funcionario on id_funcionario = FK_ID_Funcionarios;

############################################################################### ANIMAL SERVIÇO #######3####################################################################

create view vw_animal_servico as
	SELECT * from animal_servico
	JOIN tbl_animal ON id_animal = FK_ID_Animal
    JOIN tbl_servico on id_servico = FK_ID_Servicos;

############################################################################ SERVIÇO FUNCIONÁRIO #########################################################################

create view vw_servico_funcionario as
	SELECT * from servico_funcionario
	JOIN tbl_servico on id_servico = FK_ID_Servico
    JOIN tbl_funcionario ON id_funcionario = FK_ID_Funcionario;
