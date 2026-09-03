// campaign.js

const paramsBox = document.getElementById("paramsBox");

function renderNoParams() {
  paramsBox.innerHTML = `
    <p class="text-sm text-slate-500 italic">Không có tham số quảng cáo</p>
  `;
}

function renderParams(source, campaign) {
  paramsBox.innerHTML = `
    <p class="text-sm">
      <span class="text-slate-400">Tên nguồn (utm_source):</span>
      <span class="font-mono font-semibold text-slate-800">${source}</span>
    </p>
    <p class="text-sm">
      <span class="text-slate-400">Tên chiến dịch (utm_campaign):</span>
      <span class="font-mono font-semibold text-slate-800">${campaign}</span>
    </p>
  `;
}

function init() {
  // location.search trả về chuỗi bắt đầu bằng "?" (hoặc rỗng nếu không có tham số nào)
  if (!location.search) {
    renderNoParams();
    return;
  }

  const params = new URLSearchParams(location.search);
  const source = params.get("utm_source");
  const campaign = params.get("utm_campaign");

  if (!source && !campaign) {
    renderNoParams();
    return;
  }

  renderParams(source || "(không có)", campaign || "(không có)");
}

init();
