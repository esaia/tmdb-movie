'use client';

import { getTaxonomies } from '@/lib/requests';
import { Taxonomy } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { useFormContext, useWatch } from 'react-hook-form';

const TaxonomySelect = () => {
  const [isActive, setisActive] = useState(false);
  const [taxonomies, setTaxonomies] = useState<Taxonomy[]>([]);
  const [searchTaxonomy, setSearchTaxonomy] = useState('');

  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const taxonomy_ids = useWatch({ name: 'taxonomy_ids' });
  const taxonomyids = useWatch({
    control,
    name: 'taxonomy_ids',
  });

  const genreSelectTarget = useDetectClickOutside({
    onTriggered: () => setisActive(false),
  });

  useEffect(() => {
    const fetchTaxonomy = async () => {
      const data = await getTaxonomies();
      setTaxonomies(data);
    };
    fetchTaxonomy();
  }, []);

  return (
    <div
      className={`relative cursor-pointer transition-all ${isActive ? 'flex-[3]' : 'flex-[1]'}`}
      ref={genreSelectTarget}
    >
      <div onClick={() => setisActive(true)} className="flex h-full flex-col justify-between">
        <p className="text mb-2 block text-sm font-medium text-white">კატეგორია</p>
        <input
          placeholder={
            taxonomy_ids &&
            taxonomy_ids
              ?.map((chosenId: number) => taxonomies?.find(taxonomy => taxonomy?.id === +chosenId)?.name)
              ?.join(', ')
          }
          className="text flex w-full items-center rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400 outline-none"
          onChange={e => setSearchTaxonomy(e.target.value)}
        />
        <p className="smtext mt-[5px] h-2 text-red-500">{errors?.['genre_ids']?.message as string}</p>
      </div>

      {isActive && (
        <div className="absolute left-[50%] top-20 z-40 h-fit max-h-[400px] w-full translate-x-[-50%] overflow-auto rounded-md bg-primaryBlack p-5">
          {taxonomies
            .filter(taxonomy => taxonomy?.name.includes(searchTaxonomy))
            .map((taxonomy, i) => {
              return (
                <label
                  htmlFor={taxonomy?.id.toString()}
                  key={i}
                  className="mb-4 flex cursor-pointer items-center gap-3 bg-primary px-2 py-4"
                >
                  <input
                    type="checkbox"
                    id={taxonomy?.id.toString()}
                    value={taxonomy?.id}
                    {...register('taxonomy_ids')}
                    defaultChecked={taxonomyids && taxonomyids.includes(taxonomy?.id)}
                  />
                  <span className="cursor-pointer">{taxonomy?.name}</span>
                </label>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default TaxonomySelect;
