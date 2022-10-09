CMS.registerEditorComponent({
  id: 'tip',
  label: 'Tip',
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
      // default: 'TIP',
      required: false,
    },
    {
      name: 'side',
      label: 'Location',
      widget: 'select',
      options: [
        'left',
        'right',
        'full',
      ],
      //default: 'full',
      required: false,
    },
    {
      name: 'href',
      label: 'Anchor tag',
      widget: 'string',
      pattern: [
        '^[A-Za-z0-9_-]{1,100}$', '',
      ],
      required: false,
    },
  ],

  pattern: /\{\{% tip( title="(?<title>.*?)"| href="(?<href>.*?)"| side="(?<side>.*?)")* %\}\}$(?<details>.*?)\{\{% \/tip %\}\}$/ms,

  fromBlock: function(match) {
    let out = {};
    if (match.groups.details) out['details'] = match.groups.details;
    if (match.groups.href) out['href'] = match.groups.href;
    if (match.groups.side) out['side'] = match.groups.side;
    if (match.groups.title) out['title'] = match.groups.title;

    return out;
  },

  toBlock: function(data) {
    let out = ``;
    out += `{{% tip`;
    if (data.title) out += ` title="${data.title}"`;
    if (data.href) out += ` href="${data.href}"`;
    if (data.side) out += ` side="${data.side}"`;
    out += ` %}}\n`;

    out += data.details;

    out += `\n{{% /tip %}}\n`;

    return out;
  },

  toPreview: function(data) {
    let out = '';
    out += `<aside class="tip ${data.side}">\n`;

    out += `<h1>`;
    if (data.href) out += `<a name="${data.href}"></a>`;
    if (data.title) {
      out += data.title;
    } else {
      out += `TIP`;
    }
    out += `</h1>\n`;

    out += `${data.details}\n</aside>\n`;
    return out;
  },
})
