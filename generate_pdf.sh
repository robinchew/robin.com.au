#!/bin/bash
set -e

if [ ! -f "$1" ];then
    echo "1 argument required. (eg. resume.html)";
    exit 1;
fi;

# Define the HTML input file path
html_file=$1

chrome_bin=${CHROME_BIN:-"brave"}

# Run Chrome Headless in headless mode to generate the PDF
filename="robin-chew-${html_file%.*}-"`date +%Y-%m-%d`;
pdf_output=$filename".pdf";
docx_output=$filename".docx";
input=file://`readlink -f $html_file`;
echo $input;
eval $chrome_bin  \
    --headless  \
    --disable-gpu \
    --no-pdf-header-footer \
    --print-to-pdf=$pdf_output \
    $input;

eval $chrome_bin \
    --headless \
    --disable-gpu \
    --dump-dom \
    $input > temp.html;

pandoc --from=html --to=docx --output=$docx_output temp.html

# Check if PDF generation was successful
if [ -f "$pdf_output" ]; then
    echo "PDF has been generated."
    echo $pdf_output
else
    echo "PDF generation failed."
fi
