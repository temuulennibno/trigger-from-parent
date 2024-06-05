"use client";
import { useEffect, useState } from "react";

type Data = {
  id: number;
  name: string;
};

export default function Home() {
  const [data] = useState<Data[]>([
    { id: 1, name: "Hello" },
    { id: 2, name: "Bye" },
  ]);
  const [selectedData, setSelectedData] = useState<Data[]>([]);
  const [submittingData, setSubmittingData] = useState<Data[]>([]);
  const [submittedData, setSubmittedData] = useState<Data[]>([]);

  const onCheck = (id: number) => {
    const triggeringData = data.find((row) => row.id === id);
    if (selectedData.includes(triggeringData!)) {
      setSelectedData([...selectedData].filter((row) => row.id !== id));
    } else {
      setSelectedData([...selectedData, triggeringData!]);
    }
  };

  const onBatchSave = () => {
    setSubmittingData(selectedData);
    setSelectedData([]);
  };

  const onSubmit = (id: number) => {
    const triggeringData = data.find((row) => row.id === id);
    if (selectedData.includes(triggeringData!)) {
      setSubmittingData([...selectedData].filter((row) => row.id !== id));
    } else {
      setSubmittingData([...selectedData, triggeringData!]);
    }
    setSubmittedData([...submittedData, triggeringData!]);
  };

  return (
    <div className="flex w-full h-screen items-center justify-center flex-col gap-2">
      <ul className="gap-2 flex flex-col">
        {data.map((row) => {
          const checked = selectedData.filter((selectedItem) => selectedItem.id === row.id).length > 0;
          const isSubmitting = submittingData.filter((submittingItem) => submittingItem.id === row.id).length > 0;
          const isSubmitted = submittedData.filter((submittedItem) => submittedItem.id === row.id).length > 0;
          return (
            <ListItem onSubmit={onSubmit} isSubmitting={!isSubmitted && isSubmitting} onCheck={onCheck} checked={checked} key={row.id} data={row} />
          );
        })}
      </ul>
      <button className="btn" onClick={onBatchSave}>
        batch save
      </button>
    </div>
  );
}

const ListItem = ({
  data,
  checked,
  onCheck,
  isSubmitting,
  onSubmit,
}: {
  data: Data;
  checked: boolean;
  onCheck: (id: number) => void;
  isSubmitting: boolean;
  onSubmit: (id: number) => void;
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const load = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };
  useEffect(() => {
    if (isSubmitting) {
      load();
      onSubmit(data.id);
    }
  }, [isSubmitting, onSubmit]);
  return (
    <li>
      <label className="flex gap-4 items-center">
        <input
          type="checkbox"
          checked={submitted || checked}
          disabled={submitted}
          className="checkbox"
          onChange={() => {
            onCheck(data.id);
          }}
        />
        {data.name}
        <button className="btn" onClick={load} disabled={submitted}>
          {loading ? (
            <>
              <span className="loading loading-ring loading-xs"></span>
            </>
          ) : (
            <>{submitted ? <>done</> : <>go</>}</>
          )}
        </button>
      </label>
    </li>
  );
};
