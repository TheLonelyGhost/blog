CMS.registerEditorComponent({
  id: 'example',
  label: 'Example',
  fields: [
    {
      name: 'details',
      label: 'Details',
      widget: 'markdown',
    },
    {
      name: 'title',
      label: 'Title',
      widget: 'string',
      required: false,
    },
  ],

  pattern: /\{\{% example( title="(?<title>.*?)")? %\}\}$(?<details>.*?)\{\{% \/example %\}\}$/ms,

  fromBlock: function(match) {
    let out = {};
    if (match.groups.details) out['details'] = match.groups.details;
    if (match.groups.title) out['title'] = match.groups.title;

    return out;
  },

  toBlock: function(data) {
    let out = `{{% example`;

    if (data.title) out += ` title="${data.title}"`;

    out += ` %}}\n`;

    out += data.details;

    out += `\n{{% /example %}}\n`;

    return out;
  },

  toPreview: function(data) {
    let out = '';
    out += `<section class="example">\n`;

    out += `<h1>Example`;
    if (data.title) out += `: ${data.title}`;
    out += `</h1>\n`;

    out += `${data.details}\n</section>\n`;
    return out;
  },
})
