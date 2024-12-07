import React, { useState } from 'react';
import Input from '@/src/components/UiComponents/Input';
import { serieUrl } from '@/types';

const AddSeriesLinks = ({ series_urls }: { series_urls?: serieUrl[] }) => {
  const [seriesNumber, setSeriesNumber] = useState((series_urls && series_urls.length) || 1);

  return (
    <>
      <div className="h-400px] overflow-auto border border-blue-600 px-2 py-4">
        {new Array(seriesNumber).fill(seriesNumber).map((_, index) => {
          return (
            <div className="mb-10 flex gap-2" key={index}>
              <div className="w-20">
                <Input name={`serie_urls[${index}].season`} label={'სეზონი'} placeholder={'1'} type="number" />
              </div>

              <div className="w-20">
                <Input name={`serie_urls[${index}].serie`} label={'სერია'} placeholder={'1'} type="number" />
              </div>

              <div className="flex-[3]">
                <Input
                  name={`serie_urls[${index}].serie_url`}
                  label={'სერიალის ლინკი'}
                  placeholder={'https://ge.movie/movie/49313/retribution'}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex gap-3">
        <button type="button" className="rounded-sm bg-gray-800 p-2" onClick={() => setSeriesNumber(seriesNumber + 1)}>
          დაამატე სერია
        </button>
        <button
          type="button"
          className="rounded-sm bg-gray-800 p-2"
          onClick={() => {
            if (seriesNumber > 1) setSeriesNumber(seriesNumber - 1);
          }}
        >
          წაშლა
        </button>
      </div>
    </>
  );
};

export default AddSeriesLinks;
