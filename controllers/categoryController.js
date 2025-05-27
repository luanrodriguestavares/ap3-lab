const Category = require('../models/Category');

// Listar todas as categorias
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar categorias' });
  }
};

// Criar nova categoria
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Já existe uma categoria com este nome' });
    } else {
      res.status(500).json({ error: 'Erro ao criar categoria' });
    }
  }
};

// Atualizar categoria
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    await category.update({ name });
    res.json(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Já existe uma categoria com este nome' });
    } else {
      res.status(500).json({ error: 'Erro ao atualizar categoria' });
    }
  }
};

// Deletar categoria
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    
    if (!category) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    await category.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar categoria' });
  }
}; 