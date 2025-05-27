const MenuItem = require('../models/MenuItem');
const Category = require('../models/Category');

// Listar todos os itens do menu
exports.getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.findAll({
      include: [Category],
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar itens do menu' });
  }
};

// Buscar item por ID
exports.getMenuItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByPk(id, {
      include: [Category],
    });

    if (!menuItem) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    res.json(menuItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar item' });
  }
};

// Criar novo item
exports.createMenuItem = async (req, res) => {
  try {
    const { name, description, price, image, categoryId } = req.body;
    const menuItem = await MenuItem.create({
      name,
      description,
      price,
      image,
      categoryId,
    });

    const createdItem = await MenuItem.findByPk(menuItem.id, {
      include: [Category],
    });

    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar item' });
  }
};

// Atualizar item
exports.updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, categoryId } = req.body;
    const menuItem = await MenuItem.findByPk(id);

    if (!menuItem) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    await menuItem.update({
      name,
      description,
      price,
      image,
      categoryId,
    });

    const updatedItem = await MenuItem.findByPk(id, {
      include: [Category],
    });

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar item' });
  }
};

// Deletar item
exports.deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const menuItem = await MenuItem.findByPk(id);

    if (!menuItem) {
      return res.status(404).json({ error: 'Item não encontrado' });
    }

    await menuItem.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar item' });
  }
};

// Buscar itens por categoria
exports.getMenuItemsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const menuItems = await MenuItem.findAll({
      where: { categoryId },
      include: [Category],
    });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar itens da categoria' });
  }
}; 