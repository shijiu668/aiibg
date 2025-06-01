import pdf from 'pdf-parse/lib/pdf-parse.js';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('pdf');
    
    if (!file) {
      return Response.json({ error: '没有找到 PDF 文件' }, { status: 400 });
    }

    // 检查文件类型
    if (file.type !== 'application/pdf') {
      return Response.json({ error: '文件类型必须是 PDF' }, { status: 400 });
    }

    // 检查文件大小 (限制为 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return Response.json({ error: '文件大小不能超过 5MB' }, { status: 400 });
    }

    console.log('开始处理 PDF 文件:', file.name, '大小:', file.size);

    // 将文件转换为 Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 解析 PDF
    const data = await pdf(buffer);
    
    console.log('PDF 解析完成，页数:', data.numpages);
    
    return Response.json({ 
      success: true,
      text: data.text,
      pages: data.numpages,
      info: data.info,
      filename: file.name
    });
    
  } catch (error) {
    console.error('PDF 解析错误:', error);
    return Response.json({ 
      error: 'PDF 解析失败: ' + error.message 
    }, { status: 500 });
  }
}