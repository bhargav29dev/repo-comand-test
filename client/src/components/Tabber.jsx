import { useState } from "react";

const tabs = [
  { id: "tab1", label: "Tab 1", content: "Content of Tab 1" },
  { id: "tab2", label: "Tab 2", content: "Content of Tab 2" },
  { id: "tab3", label: "Tab 3", content: "Content of Tab 3" },
];

const Tabber = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  return (
    <div>
      <div>
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div>
        <h1>{activeTabData?.label}</h1>
        <p>{activeTabData?.content}</p>
      </div>
    </div>
  );
};

export default Tabber;
