python build_index.py > index.html;rsync -avu index.html `python -c 'from build_index import file_links;print(" ".join(file_links.values()))'` ubuntu@orchid-inca.bnr.la:system/robin.com.au/
