const TurmaModel = require("../../turma/models/turma.model");

class TurmaController {
  static async criarturma(req, res) {
    try {
      const { cod_turma, cod_curso, turno } = req.body;
      if (!cod_turma || !cod_curso || !turno) {
        return res.status(400).json({ msg: "Todos os campos devem serem preenchidos!" });
      }
      const turma = await TurmaModel.create({
        cod_turma,
        cod_curso,
        turno,
      });
      res.status(201).json(turma);
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
    }
  }
  static async listarTurmas(req, res) {
    try {
      const turmas = await TurmaModel.findAll();
      if (turmas.length === 0) {
        return res.status(200).json({ msg: "Não há turmas a serem exibidas!" });
      }
      res.status(200).json({msg: 'Turma criada com sucesso!', turma: turma});
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
    }
  }
  static async listarTurmaPorCodigo(req, res) {
    try {
      const codigo = req.params.cod_turma;
      const turma = await turmaModel.findByPk({ cod_turma });
      if (!turma) {
        return res.status(404).json({ msg: "turma não encontrado!" });
      }
      res.status(200).json(turma);
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
    }
  }
  static async editarTurmaPorCodigo(req, res) {
    try {
      const cod_turma = req.params.cod_turma;
      const { nome, descricao } = req.body;
      if (!nome || !descricao) {
        return res.status(400).json({
          msg: "Os campos nome e descrição do turma devem serem preenchidos!",
        });
      }
      const turmaAtualizado = await turmaModel.update(
        { nome: nome, descricao: descricao },
        {where: { cod_turma: cod_turma }}
      );
      if (turmaAtualizado.length === 0) {
        return res.status(404).json({ msg: "turma não encontrado!" });
      }
      res.status(200).json(turmaAtualizado);
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
    }
  }
  static async deletarTurma(req, res) {
    try {
      const cod_turma = req.params.cod_turma;
      const turma = await turmaModel.findByPk({ cod_turma });
      if (!turma) {
        return res.status(404).json({ msg: "turma não encontrado!" });
      }
      await turmaModel.destroy({
        where: {cod_turma: cod_turma}}
      );
      res.status(200).json({ msg: "turma excluido com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
    }
  }

   static async deletarTodasTurmas(req, res) {
    try {
      const turmas = await turmaModel.findAll();
  
      if (turmas.length === 0) {
        return res.status(200).json({ msg: "Não há turmas cadastrados para excluir." });
      }
  
      await turmaModelModel.destroy({
        where: {},
        truncate: false  // remove todos os registros sem apagar a estrutura da tabela
      });
  
      res.status(200).json({ msg: "Todos os turmas foram excluídos com sucesso!" });
    } catch (error) {
      res.status(500).json({ msg: "Erro interno do servidor. Por favor, tente mais tarde" });
    }
  }
  
}
mudule.exports = TurmaController;

