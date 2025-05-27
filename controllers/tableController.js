const Table = require('../models/Table')
const QRCode = require('qrcode')

const generateQRCode = async (url) => {
  try {
    return await QRCode.toDataURL(url)
  } catch (error) {
    console.error('Erro ao gerar QR Code:', error)
    throw error
  }
}

exports.createTable = async (req, res) => {
  try {
    const { number } = req.body
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    const qrCodeUrl = `${frontendUrl}/cliente/mesa/${number}`
    
    const qrCode = await generateQRCode(qrCodeUrl)
    
    const table = await Table.create({
      number,
      qrCode
    })

    res.status(201).json(table)
  } catch (error) {
    console.error('Erro ao criar mesa:', error)
    res.status(500).json({ error: 'Erro ao criar mesa' })
  }
}

exports.getAllTables = async (req, res) => {
  try {
    const tables = await Table.findAll({
      where: { isActive: true },
      order: [['number', 'ASC']]
    })
    res.json(tables)
  } catch (error) {
    console.error('Erro ao listar mesas:', error)
    res.status(500).json({ error: 'Erro ao listar mesas' })
  }
}

exports.getTableById = async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id)
    if (!table) {
      return res.status(404).json({ error: 'Mesa não encontrada' })
    }
    res.json(table)
  } catch (error) {
    console.error('Erro ao buscar mesa:', error)
    res.status(500).json({ error: 'Erro ao buscar mesa' })
  }
}

exports.updateTable = async (req, res) => {
  try {
    const { number } = req.body
    const table = await Table.findByPk(req.params.id)
    
    if (!table) {
      return res.status(404).json({ error: 'Mesa não encontrada' })
    }

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000'
    const qrCodeUrl = `${frontendUrl}/cliente/mesa/${number}`
    const qrCode = await generateQRCode(qrCodeUrl)

    await table.update({
      number,
      qrCode
    })

    res.json(table)
  } catch (error) {
    console.error('Erro ao atualizar mesa:', error)
    res.status(500).json({ error: 'Erro ao atualizar mesa' })
  }
}

exports.deactivateTable = async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id)
    if (!table) {
      return res.status(404).json({ error: 'Mesa não encontrada' })
    }

    await table.update({ isActive: false })
    res.json({ message: 'Mesa desativada com sucesso' })
  } catch (error) {
    console.error('Erro ao desativar mesa:', error)
    res.status(500).json({ error: 'Erro ao desativar mesa' })
  }
} 