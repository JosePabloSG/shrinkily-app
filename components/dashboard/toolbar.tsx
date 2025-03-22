'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreateUrl } from '@/components/urls/create-url';
import { PlusIcon, SearchIcon, FilterIcon, XIcon } from 'lucide-react';
import { Tags } from '@prisma/client';
import { TagFilter } from '../tags/tag-filter';
import { useDebounce } from '@/hooks/useDebounce';
import { useUrlParams } from '@/hooks/useUrlParams';
import { useTranslations } from 'next-intl';

interface ToolbarProps {
  tags: Tags[];
}

export function Toolbar({ tags }: ToolbarProps) {
  const t = useTranslations('toolbar');
  const { setParam, getParam } = useUrlParams();
  const [shortUrl, setShortUrl] = useState(getParam('shortUrl'));
  const [selectedTag, setSelectedTag] = useState(getParam('tag'));

  const debouncedShortUrl = useDebounce(shortUrl, 300);
  const debouncedTag = useDebounce(selectedTag, 300);

  useEffect(() => {
    if (debouncedShortUrl !== getParam('shortUrl')) {
      setParam('shortUrl', debouncedShortUrl);
    }
  }, [debouncedShortUrl, getParam, setParam]);

  useEffect(() => {
    if (debouncedTag !== getParam('tag')) {
      setParam('tag', debouncedTag);
    }
  }, [debouncedTag, getParam, setParam]);

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
  };

  const handleTagClear = () => {
    setSelectedTag('');
  };

  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-4">
        <div className="w-full md:w-auto">
          <CreateUrl tags={tags}>
            <Button variant={'primary'} className="w-full md:w-auto">
              <PlusIcon size={16} className="mr-2" />
              <span>{t('createUrl')}</span>
            </Button>
          </CreateUrl>
        </div>
        <div className="relative flex-grow">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <Input
            placeholder={t('searchPlaceholder')}
            value={shortUrl}
            onChange={(e) => setShortUrl(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <TagFilter tags={tags} onSelect={handleTagSelect} selectedTag={selectedTag} onTagClear={handleTagClear}>
          <Button variant="outline" className="flex items-center gap-2">
            <FilterIcon size={16} />
            <span className="hidden sm:inline">{t('filterTags')}</span>
          </Button>
        </TagFilter>
        {selectedTag && (
          <Button variant="outline" onClick={handleTagClear} className="flex items-center gap-2">
            <XIcon size={16} />
            <span className="hidden sm:inline">{t('clearFilter')}</span>
          </Button>
        )}
      </div>
    </div>
  );
}
