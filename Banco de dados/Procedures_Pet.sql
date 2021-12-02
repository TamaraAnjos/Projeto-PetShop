########################################################################### CRIANDO PROCEDURES ###########################################################################

################################################################################# CLIENTE #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_insere_clientes(p_nome varchar(45), p_cpf varchar(14), p_nascimento date, p_sexo char(1), p_telefone varchar(45), p_email varchar(45))
	BEGIN
		INSERT INTO tbl_cliente(nome, cpf, nascimento, sexo, telefone, email)
			values(p_nome, p_cpf, p_nascimento, p_sexo, p_telefone, p_email);
	END $$
    
################################################################################# ANIMAL #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_insere_animal(p_nome varchar(45), p_cpf varchar(14), p_nascimento date, p_sexo char(1), p_telefone varchar(45), p_email varchar(45),
		p_nome_animal varchar(45), p_especie varchar(45), p_sexo_a varchar(45), p_nascimento_a date, p_peso int(11))
	BEGIN
		INSERT INTO tbl_cliente(nome, cpf, nascimento, sexo, telefone, email) values(p_nome, p_cpf, p_nascimento, p_sexo, p_telefone, p_email);
        
		INSERT INTO tbl_animal(nome_animal, especie, sexo_a, nascimento_a, peso, FK_ID_Cliente)
			values(p_nome_animal, p_especie, p_sexo_a, p_nascimento_a, p_peso, (select max(id_cliente) from tbl_cliente));
	END $$
    
################################################################################# SERVIÇO #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_insere_servico(p_descricao varchar(45), p_valor_servico decimal(6,2), p_tempo_servico time)
	BEGIN
		INSERT INTO tbl_servico(descricao, valor_servico, tempo_servico) values(p_descricao, p_valor_servico, p_tempo_servico);
	END $$

############################################################################### FUNCIONÁRIO ###############################################################################

DELIMITER $$
	CREATE PROCEDURE sp_insere_fun(p_nome varchar(45), p_cpf varchar(14))
	BEGIN
		INSERT INTO tbl_funcionario(nome_f, cpf_f)
			values(p_nome, p_cpf);
	END $$

############################################################################# ANIMAL_SERVIÇO #############################################################################
DELIMITER $$
	CREATE PROCEDURE sp_insere_animal_servico(p_nome varchar(45), p_cpf varchar(14), p_nascimento date, p_sexo char(1), p_telefone varchar(45), p_email varchar(45),
    p_nome_animal varchar(45), p_especie varchar(45), p_sexo_a varchar(45), p_nascimento_a date, p_peso int, p_descricao varchar(45), p_valor_servico decimal(6,2),
    p_tempo_servico time, p_data_servico datetime)
	BEGIN
		INSERT INTO tbl_cliente(nome, cpf, nascimento, sexo, telefone, email) values(p_nome, p_cpf, p_nascimento, p_sexo, p_telefone, p_email);
            
		INSERT INTO tbl_animal(nome_animal, especie, sexo_a, nascimento_a, peso, FK_ID_Cliente)
			values(p_nome_animal, p_especie, p_sexo_a, p_nascimento_a, p_peso, (select max(id_cliente) from tbl_cliente));
            
		INSERT INTO tbl_servico(descricao, valor_servico, tempo_servico) values(p_descricao, p_valor_servico, p_tempo_servico);
        
        INSERT INTO animal_servico(FK_ID_Animal, FK_ID_Servicos, data_servico)
        values ((select max(id_animal) from tbl_animal), (select max(id_servico) from tbl_servico), p_data_servico);
END $$

################################################################################# COMPRA #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_insere_compra_cli_fun(p_nome varchar(45), p_cpf varchar(14), p_nascimento date, p_sexo char(1), p_telefone varchar(45), p_email varchar(45), 
    p_nome_f varchar(45), p_cpf_f varchar(14), p_valor_total decimal(7,2), p_data_atual datetime)
	BEGIN
		INSERT INTO tbl_cliente(nome, cpf, nascimento, sexo, telefone, email) values(p_nome, p_cpf, p_nascimento, p_sexo, p_telefone, p_email);
            
		INSERT INTO tbl_funcionario(nome_f, cpf_f) values(p_nome_f, p_cpf_f);
            
		INSERT INTO tbl_compra(valor_total, data_atual, FK_ID_Clientes, FK_ID_Funcionarios)
			values(p_valor_total, p_data_atual, (select max(id_cliente) from tbl_cliente), (select max(id_funcionario) from tbl_funcionario));
END $$

############################################################################# SERVIÇO FUNCIO #############################################################################

DELIMITER $$
	CREATE PROCEDURE sp_insere_servico_fun(p_descricao varchar(45), p_valor_servico decimal(6,2), p_tempo_servico time, p_nome varchar(45), p_cpf varchar(14))
	BEGIN
		INSERT INTO tbl_servico(descricao, valor_servico, tempo_servico) values(p_descricao, p_valor_servico, p_tempo_servico);
        
		INSERT INTO tbl_funcionario(nome_f, cpf_f) values(p_nome, p_cpf);
            
		INSERT INTO servico_funcionario(FK_ID_Servico, FK_ID_Funcionario)
			values((select max(id_servico) from tbl_servico), (select max(id_funcionario) from tbl_funcionario));
END $$

########################################################################### ATUALIZA PROCEDURES ###########################################################################

################################################################################# CLIENTE #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_atualiza_clientes(p_nome varchar(45), p_cpf varchar(14), p_nascimento date, p_sexo char(1), p_telefone varchar(45), p_email varchar(45), p_id_cliente int)
	BEGIN
		UPDATE tbl_cliente SET nome = p_nome, cpf = p_cpf, nascimento = p_nascimento, sexo = p_sexo, telefone = p_telefone, email = p_email WHERE id_cliente = p_id_cliente;
	END $$

################################################################################# ANIMAL #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_atualiza_animal(p_nome varchar(45), p_cpf varchar(14), p_nascimento date, p_sexo char(1), p_telefone varchar(45), p_email varchar(45),
		p_nome_animal varchar(45), p_especie varchar(45), p_sexo_a varchar(45), p_nascimento_a date, p_peso int(11), p_id_cliente int, p_id_animal int)
	BEGIN
		UPDATE tbl_cliente SET nome = p_nome, cpf = p_cpf, nascimento = p_nascimento, sexo = p_sexo, telefone = p_telefone, email = p_email WHERE id_cliente = p_id_cliente;
        
		UPDATE tbl_animal SET nome_animal = p_nome_animal, especie = p_especie, sexo_a = p_sexo_a, nascimento_a = p_nascimento_a, peso = p_peso
			WHERE id_animal = p_id_animal;
	END $$

################################################################################# SERVIÇO #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_atualiza_servico(p_descricao varchar(45), p_valor_servico decimal(6,2), p_tempo_servico time, p_id_servico int)
	BEGIN
		UPDATE tbl_servico SET descricao = p_descricao, valor_servico = p_valor_servico, tempo_servico = p_tempo_servico WHERE id_servico = p_id_servico;
	END $$
    
############################################################################### FUNCIONÁRIO ###############################################################################

DELIMITER $$
	CREATE PROCEDURE sp_atualiza_fun(p_nome varchar(45), p_cpf varchar(14), p_id_funcionario int)
	BEGIN
		UPDATE tbl_funcionario SET nome_f = p_nome, cpf_f = p_cpf WHERE id_funcionario = p_id_funcionario;
	END $$

############################################################################# ANIMAL_SERVIÇO #############################################################################

DELIMITER $$
	CREATE PROCEDURE sp_atualiza_animal_servico(p_nome varchar(45), p_cpf varchar(14), p_nascimento date, p_sexo char(1), p_telefone varchar(45), p_email varchar(45),
	p_nome_animal varchar(45), p_especie varchar(45), p_sexo_a varchar(45), p_nascimento_a date, p_peso int, p_descricao varchar(45), 
    p_valor_servico decimal(6,2), p_tempo_servico time, p_data_servico datetime, p_id_cliente int, p_id_animal int, p_id_servico int, p_FK_ID_Animal int)
	BEGIN
		UPDATE tbl_cliente SET nome = p_nome, cpf = p_cpf, nascimento = p_nascimento, sexo = p_sexo, telefone = p_telefone, email = p_email WHERE id_cliente = p_id_cliente;
            
		UPDATE tbl_animal SET nome_animal = p_nome_animal, especie = p_especie, sexo_a = p_sexo_a, nascimento_a = p_nascimento, peso = p_peso WHERE id_animal = p_id_animal;
            
		UPDATE tbl_servico SET descricao = p_descricao, valor_servico = p_valor_servico, tempo_servico = p_tempo_servico WHERE id_servico = p_id_servico;
        
        UPDATE animal_servico SET data_servico = p_data_servico WHERE FK_ID_Animal = p_FK_ID_Animal;
END $$

################################################################################# COMPRA #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_atualiza_compra_cli_fun(p_nome varchar(45), p_cpf varchar(14), p_nascimento date, p_sexo char(1), p_telefone varchar(45), p_email varchar(45),
	p_nome_f varchar(45), p_cpf_f varchar(14), p_valor_total decimal(7,2), p_data_atual datetime, p_id_compra int, p_id_cliente int, p_id_funcionario int)
	BEGIN
		UPDATE tbl_cliente SET  nome = p_nome , cpf = p_cpf, nascimento = p_nascimento, sexo = p_sexo, telefone = p_telefone, email = p_email WHERE id_cliente = p_id_cliente;

		UPDATE tbl_funcionario SET nome_f = p_nome_f, cpf_f = p_cpf_f WHERE id_funcionario = p_id_funcionario;
            
		UPDATE tbl_compra SET valor_total = p_valor_total, data_atual = p_data_atual WHERE id_compra = p_id_compra;
END $$

############################################################################# SERVIÇO FUNCIO #############################################################################

DELIMITER $$
	CREATE PROCEDURE sp_atualiza_servico_fun(p_descricao varchar(45), p_valor_servico decimal(6,2), p_tempo_servico time, p_nome varchar(45), p_cpf varchar(14), p_id_servico int, p_id_funcionario int, p_FK_ID_Service int)
	BEGIN
		UPDATE tbl_servico SET descricao = p_descricao, valor_servico = p_valor_servico, tempo_servico = p_tempo_servico WHERE id_servico = p_id_servico;
        
		UPDATE tbl_funcionario SET nome_f = p_nome, cpf_f = p_cpf WHERE id_funcionario = p_id_funcionario;
            
		UPDATE servico_funcionario SET servico_funcionario_deletado = default WHERE FK_ID_Servico = p_FK_ID_Service;
END $$

########################################################################### PROCEDURES DELETAR ###########################################################################

################################################################################# CLIENTE #################################################################################

DELIMITER $$
CREATE PROCEDURE sp_delete_servico_fun(p_cliente int)
	BEGIN
		UPDATE tbl_cliente SET cliente_deletado = true WHERE id_cliente = p_cliente;
	END $$
    
################################################################################# ANIMAL #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_delete_animal(p_id_cliente int, p_id_animal int)
	BEGIN
		UPDATE tbl_cliente SET cliente_deletado = true WHERE id_cliente = p_id_cliente;
        
		UPDATE tbl_animal SET animal_deletado = true WHERE id_animal = p_id_animal;
	END $$
    
    ################################################################################# SERVIÇO #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_delete_servico(p_id_servico int)
	BEGIN
		UPDATE tbl_servico SET servico_deletado = true WHERE id_servico = p_id_servico;
	END $$

############################################################################### FUNCIONÁRIO ###############################################################################

DELIMITER $$
	CREATE PROCEDURE sp_deleta_fun(p_id_funcionario int)
	BEGIN
		UPDATE tbl_funcionario SET funcionario_deletado = true WHERE id_funcionario = p_id_funcionario;
	END $$
    
############################################################################# ANIMAL_SERVIÇO #############################################################################

DELIMITER $$
	CREATE PROCEDURE sp_deleta_animal_servico(p_id_cliente int, p_id_animal int, p_id_servico int, p_FK_ID_Animal int)
	BEGIN
		UPDATE tbl_cliente SET cliente_deletado = true WHERE id_cliente = p_id_cliente;
            
		UPDATE tbl_animal SET animal_deletado = true WHERE id_animal = p_id_animal;
            
		UPDATE tbl_servico SET servico_deletado = true WHERE id_servico = p_id_servico;
        
        UPDATE animal_servico SET animal_servico_deletado = true WHERE FK_ID_Animal = p_FK_ID_Animal;
END $$

################################################################################# COMPRA #################################################################################

DELIMITER $$
	CREATE PROCEDURE sp_deleta_compra_cli_fun(p_id_compra int, p_id_cliente int, p_id_funcionario int)
	BEGIN
		UPDATE tbl_cliente SET  cliente_deletado = true WHERE id_cliente = p_id_cliente;

		UPDATE tbl_funcionario SET funcionario_deletado = true WHERE id_funcionario = p_id_funcionario;
            
		UPDATE tbl_compra SET compra_deletada = true WHERE id_compra = p_id_compra;
END $$

############################################################################# SERVIÇO FUNCIO #############################################################################

DELIMITER $$
	CREATE PROCEDURE sp_deleta_servico_fun(p_id_servico int, p_id_funcionario int, p_FK_ID_Servico int)
	BEGIN
		UPDATE tbl_servico SET servico_deletado = true WHERE id_servico = p_id_servico;
        
		UPDATE tbl_funcionario SET funcionario_deletado = true WHERE id_funcionario = p_id_funcionario;
            
		UPDATE servico_funcionario SET servico_funcionario_deletado = true WHERE FK_ID_Servico = p_FK_ID_Servico;
END $$

############################################################################# PROCEDURE INSERE USUÁRIO #######################################################################

DELIMITER $$
	CREATE PROCEDURE sp_insere_usuario(p_email varchar(45), p_senha varchar(100), p_usuario varchar(45))
	BEGIN
		INSERT INTO tbl_usuarios(email, senha, usuario)
			values(p_email, MD5(p_senha), p_usuario);
	END $$
    
########################################################################### PROCEDURE ATUALIZAR USUÁRIO #######################################################################

DELIMITER $$
	CREATE PROCEDURE sp_atualiza_usuario(p_email varchar(45), p_senha varchar(100), p_usuario varchar(45), p_id_login int)
	BEGIN
		UPDATE tbl_usuarios SET email = p_email, senha = md5(p_senha), usuario = p_usuario WHERE id_login = p_id_login;
	END $$

############################################################################ PROCEDURE DELETAR USUÁRIO #########################################################################

DELIMITER $$
CREATE PROCEDURE sp_delete_usuario(p_login int)
	BEGIN
		UPDATE tbl_usuarios SET usuario_deletado = true WHERE id_login = p_login;
	END $$